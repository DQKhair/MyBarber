using Microsoft.EntityFrameworkCore;

namespace MyBarBer.Data
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions options) :base(options) 
        {
            
        }

        #region
        public DbSet<Categories> Categories { get; set; }
        public DbSet<ItemCategories> ItemCategories { get; set; }
        public DbSet<ReceiptDetails> ReceiptDetails { get; set; }
        public DbSet<Receipts> Receipts { get; set; }
        public DbSet<Statuses> Statuses { get; set; }
        public DbSet<Methods> Methods { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Employees> Employees { get; set; }
        public DbSet<RolesUser> RolesUser { get; set; }
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<FunctionDetails> FunctionDetails { get; set; }
        public DbSet<FunctionsUser> FunctionsUser { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>(entity =>
            {
                entity.ToTable("Categories");
                entity.HasKey(e => e.Category_ID);
                entity.Property(e => e.CategoryName).HasMaxLength(50).IsRequired();
            });

            modelBuilder.Entity<ItemCategories>(entity =>
            {
                entity.ToTable("ItemCategories");
                entity.HasKey(e => e.ItemCategory_ID);

                entity.HasOne(e => e.Categories)
                        .WithMany(e => e.ItemCategories)
                        .HasForeignKey(e => e.Category_ID)
                        .HasConstraintName("FK_ItemCategories_Categories");
            });
        }
    }
}
