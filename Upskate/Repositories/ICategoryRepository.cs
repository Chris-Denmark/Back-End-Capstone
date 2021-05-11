using System.Collections.Generic;
using Upskate.Models;

namespace Upskate.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
    }
}