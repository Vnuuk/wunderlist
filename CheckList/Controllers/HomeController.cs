using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace CheckList.Controllers
{
    public class HomeController : Controller
    {
        private readonly TodoContext _context;

        public HomeController(TodoContext context)
        {
            _context = context;
        }

        [Route("lists/get")]
        public object GetLists()
        {
            return _context.CheckLists.ToList();
        }

        [Route("lists/delete")]
        public object Delete(int id)
        {
            var list = _context.CheckLists.First(r => r.Id == id);
            _context.CheckLists.Remove(list);
            _context.SaveChanges();

            return _context.CheckLists.ToList();
        }

        [Route("list/details")]
        public object Details(int id)
        {
            var items = _context.ItemDetails.Where(r => r.CheckListId == id);
            return items?.ToList();
        }

        [Route("list/items/add")]
        public object AddListItem(int listId, string title)
        {
            var item = new ItemInfo { CheckListId = listId, Done = false, Title = title };
            _context.ItemDetails.Add(item);
            _context.SaveChanges();

            return _context.ItemDetails.Where(r => r.CheckListId == listId).ToList();
        }

        [Route("list/items/update")]
        public void UpdateListItem(int itemId, string done)
        {
            var item = _context.ItemDetails.First(r => r.Id == itemId);
            if (item != null)
            {
                item.Done = !bool.Parse(done);
            }
            _context.SaveChanges();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}