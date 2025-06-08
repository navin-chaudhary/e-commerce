// app/api/checkout/route.js
import { NextResponse } from 'next/server';
import stripe from '../../../lib/stripe-server';
import { calculateDiscount } from '../../../lib/discounts';

export async function POST(request) {
  try {
    const { items, couponCode } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    console.log('Processing items:', items);

    // Validate and clean items
    const validItems = [];
    for (const item of items) {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);

      console.log(`Item validation - Title: ${item.title}, Price: ${price}, Quantity: ${quantity}`);

      // Validate price and quantity
      if (isNaN(price) || price <= 0) {
        console.error(`Invalid price for item ${item.title}: ${item.price}`);
        return NextResponse.json(
          { error: `Invalid price for item: ${item.title}` },
          { status: 400 }
        );
      }

      if (isNaN(quantity) || quantity <= 0) {
        console.error(`Invalid quantity for item ${item.title}: ${item.quantity}`);
        return NextResponse.json(
          { error: `Invalid quantity for item: ${item.title}` },
          { status: 400 }
        );
      }

      validItems.push({
        ...item,
        price: price,
        quantity: quantity
      });
    }

    console.log('Valid items:', validItems);

    // Calculate subtotal
    const subtotal = validItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    console.log('Calculated subtotal:', subtotal);

    // Initialize discount variables
    let discountAmount = 0;
    let discountDescription = null;

    // Apply discount if coupon code is provided
    if (couponCode && couponCode.trim()) {
      console.log('Processing coupon:', couponCode);
      const discountResult = calculateDiscount(couponCode, subtotal);
      
      if (!discountResult.error) {
        discountAmount = discountResult.discountAmount;
        discountDescription = discountResult.discountDescription;
        console.log('Discount applied:', discountAmount);
      } else {
        console.log('Discount error:', discountResult.error);
      }
    }

    // Transform cart items to Stripe format with proper validation
    const lineItems = [];

    for (const item of validItems) {
      const unitAmount = Math.round(item.price * 100); // Convert to cents
      
      console.log(`Creating line item for ${item.title}: $${item.price} -> ${unitAmount} cents`);

      // Ensure unit_amount is a positive integer
      if (unitAmount <= 0 || !Number.isInteger(unitAmount)) {
        console.error(`Invalid unit_amount for ${item.title}: ${unitAmount}`);
        return NextResponse.json(
          { error: `Invalid price calculation for ${item.title}` },
          { status: 400 }
        );
      }

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title || 'Product',
            description: item.description || '',
            images: item.image ? [item.image] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      });
    }

    // Add discount as line item if applicable
    if (discountAmount > 0) {
      const discountCents = Math.round(discountAmount * 100);
      
      console.log(`Adding discount line item: $${discountAmount} -> ${discountCents} cents`);

      // Ensure discount doesn't exceed total
      const totalCents = lineItems.reduce((total, item) => {
        return total + (item.price_data.unit_amount * item.quantity);
      }, 0);

      const finalDiscountCents = Math.min(discountCents, totalCents - 50); // Leave at least 50 cents (minimum Stripe amount)

      if (finalDiscountCents > 0) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Discount: ${couponCode}`,
              description: discountDescription || `Discount applied with code ${couponCode}`,
            },
            unit_amount: -finalDiscountCents, // Negative amount for discount
          },
          quantity: 1,
        });
      }
    }

    console.log('Final line items:', lineItems);

    // Create Stripe checkout session
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        order_id: `order_${Date.now()}`,
        coupon_code: couponCode || '',
        original_subtotal: subtotal.toFixed(2),
        discount_amount: discountAmount.toFixed(2),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN'],
      },
      allow_promotion_codes: true,
    };

    console.log('Creating Stripe session...');
    const session = await stripe.checkout.sessions.create(sessionParams);
    console.log('Session created successfully:', session.id);

    return NextResponse.json({ 
      sessionId: session.id,
      discountApplied: discountAmount > 0,
      discountAmount: discountAmount,
      originalSubtotal: subtotal,
      finalTotal: Math.max(0.50, subtotal - discountAmount) // Minimum 50 cents
    });

  } catch (error) {
    console.error('=== CHECKOUT ERROR DETAILS ===');
    console.error('Error message:', error.message);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to create payment session',
        details: error.message,
        type: error.type || 'unknown',
        code: error.code || 'unknown'
      },
      { status: 500 }
    );
  }
}