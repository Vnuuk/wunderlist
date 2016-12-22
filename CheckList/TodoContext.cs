using Microsoft.EntityFrameworkCore;

namespace CheckList
{
    public class TodoContext: DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        { }

        public DbSet<CheckList> CheckLists { get; set; }
        public DbSet<ItemInfo> ItemDetails { get; set; }
    }
}