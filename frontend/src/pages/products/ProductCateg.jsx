import { useState } from 'react';
import { useGetAllCategoriesQuery, useGetProductsByCategoryQuery } from '../../features/api/productApi';

const ProductCateg = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetching categories
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useGetAllCategoriesQuery();

  // Fetch products by category when a category is selected
  const { data: productsByCategoryData, isLoading: isCategoryLoading, error: categoryError } = useGetProductsByCategoryQuery(selectedCategory, { skip: !selectedCategory });

  // Handle loading and error states for categories
  if (isCategoriesLoading) {
    return <div className="text-center text-lg">Loading categories...</div>;
  }
  if (categoriesError) {
    return <div className="text-red-500 text-center">Error: {categoriesError.message}</div>;
  }

  // Handle loading states for products
  if (isCategoryLoading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }
  if (categoryError) {
    return <div className="text-red-500 text-center">Error: {categoryError.message}</div>;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-100 p-6 mt-10">
      <h2 className="font-bold text-2xl text-center mb-10">CATEGORIES</h2>

      {/* Categories Section */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 px-4">
        {categories?.data.map((category, index) => (
          <div
            key={index}
            className="group relative bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:border-blue-500"
            onClick={() => handleCategoryClick(category)}
          >

            {/* Category Name */}
            <h3 className="text-lg font-semibold text-center mt-4 text-gray-800">
              {category}
            </h3>

            {/* Subtext */}
            <p className="text-sm text-gray-600 text-center mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
              Explore now →
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        {selectedCategory && (
          <>
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">PRODUCTS IN {selectedCategory}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.isArray(productsByCategoryData) ? (
                productsByCategoryData.map((product) => (
                  <div key={product._id} className="bg-white p-4 shadow-md rounded-lg">
                    <img src={product.imageUrl} alt={product.productName} className="w-full h-32 object-cover rounded" />
                    <h3 className="text-lg font-bold mt-2">{product.productName}</h3>
                    <p className="text-gray-700 mt-1">{product.description}</p>
                    <p className="text-lg font-semibold mt-2">${product.price}</p>
                  </div>
                ))
              ) : productsByCategoryData?.data && Array.isArray(productsByCategoryData.data) ? (
                productsByCategoryData.data.map((product) => (
                  <div key={product._id} className="bg-white p-4 shadow-md rounded-lg">
                    <img src={product.imageUrl} alt={product.productName} className="w-full h-32 object-cover rounded" />
                    <h3 className="text-lg font-bold mt-2">{product.productName}</h3>
                    <p className="text-gray-700 mt-1">{product.description}</p>
                    <p className="text-lg font-semibold mt-2">${product.price}</p>
                  </div>
                ))
              ) : (
                <div>No products available or an error occurred.</div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ProductCateg;