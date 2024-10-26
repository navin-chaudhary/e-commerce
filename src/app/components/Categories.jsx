export default function CategoriesPage() {
  const categories = [
    { name: "Men", icon: "👔" },
    { name: "Women", icon: "👗" },
    { name: "Kids", icon: "🧒" },
    { name: "Cosmetics", icon: "💄" },
    { name: "Accessories", icon: "👜" },
    { name: "Home", icon: "🏡" },
    { name: "Footwears", icon: "👟" },
    { name: "Sports", icon: "🏀" },
  ];

  return (
    <div className="mx-auto px-4 py-8 bg-white text-black">
      <h2 className="text-2xl font-bold m-6 lg:pl-16 lg:text-4xl">Categories</h2>
      <div className="flex flex-wrap lg:pl-16">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center  rounded-full p-4 m-2"
          >
            <div className="icon-container text-4xl text-gray-600 bg-[#f1f5f9] rounded-full p-5 cursor-pointer">{category.icon}</div>
            <div className="name-container mt-2 text-lg font-medium text-gray-800">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
