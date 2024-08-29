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
            modelBuilder.Entity<Administrator>(entity =>
            {
                entity.ToTable("Administrator");
                entity.HasKey(e => e.Admin_ID);
                entity.Property(e => e.AdminName).HasMaxLength(100);
                entity.Property(e => e.AdminAddress).HasMaxLength(500);
                entity.Property(e => e.AdminPhone).HasMaxLength(11);
                entity.Property(e => e.AdminEmail).HasMaxLength(100);
                entity.Property(e => e.AdminPassword).HasMaxLength(100);

                entity.HasOne(d => d.RoleUser).WithMany(d => d.Administrators)
                        .HasForeignKey(d => d.Role_ID)
                        .HasConstraintName("FK_Admin_RolesUser");
            });

            modelBuilder.Entity<Categories>(entity =>
            {
                entity.ToTable("Categories");
                entity.HasKey(e => e.Category_ID);
                entity.Property(e => e.Category_ID).UseIdentityColumn(1,1);
                entity.Property(e => e.CategoryName).HasMaxLength(50);
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.ToTable("Customers");
                entity.HasKey(e => e.Customer_ID);
                entity.Property(e => e.CustomerName).HasMaxLength(100);
                entity.Property(e => e.CustomerPhone).HasMaxLength(11);
                entity.Property(e => e.CustomerAddress).HasMaxLength(500);
            });

            modelBuilder.Entity<Employees>(entity =>
            {
                entity.ToTable("Employees");
                entity.HasKey(e => e.Employee_ID);
                entity.Property(e => e.EmployeeName).HasMaxLength(100);
                entity.Property(e => e.EmployeeAddress).HasMaxLength(500);
                entity.Property(e => e.EmployeePhone).HasMaxLength(11);
                entity.Property(e => e.EmployeeEmail).HasMaxLength(100);
                entity.Property(e => e.EmployeePassword).HasMaxLength(100);

                entity.HasOne(d => d.RolesUser).WithMany(d => d.Employees)
                        .HasForeignKey(d => d.Role_ID)
                        .HasConstraintName("FK_Employees_RolesUser");
            });

            modelBuilder.Entity<FunctionDetails>(entity =>
            {
                entity.ToTable("FunctionDetails");
                entity.HasKey(e => e.FunctionDetail_ID);
                entity.Property(e => e.Desccription).HasMaxLength(100);

                entity.HasOne(d => d.RoleUser).WithMany(d => d.FunctionDetails)
                        .HasForeignKey(d => d.Role_ID)
                        .HasConstraintName("FK_FunctionDetails_RolesUser");

                entity.HasOne(d => d.FunctionsUser).WithMany(d => d.FunctionDetails)
                        .HasForeignKey(d => d.Function_ID)
                        .HasConstraintName("FK_FunctionDetails_FunctionsUser");
            });

            modelBuilder.Entity<FunctionsUser>(entity =>
            {
                entity.ToTable("FunctionsUser");
                entity.HasKey(e => e.Function_ID);
                entity.Property(e => e.FunctionName).HasMaxLength(100);
                entity.Property(e => e.FunctionIcon).HasMaxLength(200);
                entity.Property(e => e.FunctionRoute).HasMaxLength(100);
            });

            modelBuilder.Entity<ItemCategories>(entity =>
            {
                entity.ToTable("ItemCategories");
                entity.HasKey(e => e.ItemCategory_ID);
                entity.Property(e => e.ItemCategoryName).HasMaxLength(100);
                entity.Property(e => e.ItemCategoryDescription).HasMaxLength(100);

                entity.HasOne(d => d.Categories)
                        .WithMany(d => d.ItemCategories)
                        .HasForeignKey(d => d.Category_ID)
                        .HasConstraintName("FK_ItemCategories_Categories");
            });

            modelBuilder.Entity<Methods>(entity =>
            {
                entity.ToTable("Methods");
                entity.HasKey(e => e.Method_ID);
                entity.Property(e => e.MethodName).HasMaxLength(100);
            });

            modelBuilder.Entity<ReceiptDetails>(entity =>
            {
                entity.ToTable("ReceiptDetails");
                entity.HasKey(e => e.ReceiptDetail_ID);

                entity.HasOne(d => d.Receipts).WithMany(d => d.ReceiptDetails)
                        .HasForeignKey(d => d.Receipt_ID)
                        .HasConstraintName("FK_ReceiptDetails_Receipts");

                entity.HasOne(d => d.ItemCategories).WithMany(d => d.ReceiptDetails)
                        .HasForeignKey(d => d.ItemCategory_ID)
                        .HasConstraintName("FK_ReceiptDetails_ItemCategories");

            });

            modelBuilder.Entity<Receipts>(entity =>
            {
                entity.ToTable("Receipts");
                entity.HasKey(e => e.Receipt_ID);
                entity.Property(e => e.ReceiptDate).HasColumnType("datetime");

                entity.HasOne(d => d.Statuses).WithMany(d => d.Receipts)
                        .HasForeignKey(d => d.Status_ID)
                        .HasConstraintName("FK_Receipts_Statuses");

                entity.HasOne(d => d.Methods).WithMany(d => d.Receipts)
                        .HasForeignKey(d => d.Method_ID)
                        .HasConstraintName("FK_Receipts_Methods");

                entity.HasOne(d => d.Employees).WithMany(d => d.Receipts)
                        .HasForeignKey(d => d.Employee_ID)
                        .HasConstraintName("FK_Receipts_Employees");

                entity.HasOne(d => d.Customers).WithMany(d => d.Receipts)
                        .HasForeignKey(d => d.Customer_ID)
                        .HasConstraintName("FK_Receipts_Customers");
            });

            modelBuilder.Entity<RolesUser>(entity =>
            {
                entity.ToTable("RolesUser");
                entity.HasKey(e => e.Role_ID);
                entity.Property(e => e.RoleName).HasMaxLength(100);
            });

            modelBuilder.Entity<Statuses>(entity =>
            {
                entity.ToTable("Statuses");
                entity.HasKey(e => e.Status_ID);
                entity.Property(e => e.StatusName).HasMaxLength(100);
            });

        }
    }
}
