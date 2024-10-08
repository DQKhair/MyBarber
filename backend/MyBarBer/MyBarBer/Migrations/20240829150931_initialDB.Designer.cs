﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MyBarBer.Data;

#nullable disable

namespace MyBarBer.Migrations
{
    [DbContext(typeof(MyDBContext))]
    [Migration("20240829150931_initialDB")]
    partial class initialDB
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MyBarBer.Data.Administrator", b =>
                {
                    b.Property<Guid>("Admin_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AdminAddress")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("AdminEmail")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AdminName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AdminPassword")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("AdminPhone")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<Guid?>("Role_ID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Admin_ID");

                    b.HasIndex("Role_ID");

                    b.ToTable("Administrator", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Categories", b =>
                {
                    b.Property<int>("Category_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Category_ID"));

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Category_ID");

                    b.ToTable("Categories", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Customers", b =>
                {
                    b.Property<Guid>("Customer_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CustomerAddress")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("CustomerPhone")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.HasKey("Customer_ID");

                    b.ToTable("Customers", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Employees", b =>
                {
                    b.Property<Guid>("Employee_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("EmployeeAddress")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("EmployeeEmail")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("EmployeeIsActive")
                        .HasColumnType("bit");

                    b.Property<string>("EmployeeName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("EmployeePassword")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("EmployeePhone")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.Property<Guid?>("Role_ID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Employee_ID");

                    b.HasIndex("Role_ID");

                    b.ToTable("Employees", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.FunctionDetails", b =>
                {
                    b.Property<Guid>("FunctionDetail_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Desccription")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<Guid?>("Function_ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Role_ID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("FunctionDetail_ID");

                    b.HasIndex("Function_ID");

                    b.HasIndex("Role_ID");

                    b.ToTable("FunctionDetails", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.FunctionsUser", b =>
                {
                    b.Property<Guid>("Function_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("FunctionIcon")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("FunctionName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("FunctionRoute")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Function_ID");

                    b.ToTable("FunctionsUser", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.ItemCategories", b =>
                {
                    b.Property<Guid>("ItemCategory_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int?>("Category_ID")
                        .HasColumnType("int");

                    b.Property<string>("ItemCategoryDescription")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ItemCategoryImage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ItemCategoryName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("ItemCategoryPrice")
                        .HasColumnType("float");

                    b.HasKey("ItemCategory_ID");

                    b.HasIndex("Category_ID");

                    b.ToTable("ItemCategories", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Methods", b =>
                {
                    b.Property<Guid>("Method_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("MethodName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Method_ID");

                    b.ToTable("Methods", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.ReceiptDetails", b =>
                {
                    b.Property<Guid>("ReceiptDetail_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ItemCategory_ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("ReceiptDetailPrice")
                        .HasColumnType("float");

                    b.Property<int>("ReceiptDetailQuantity")
                        .HasColumnType("int");

                    b.Property<Guid?>("Receipt_ID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ReceiptDetail_ID");

                    b.HasIndex("ItemCategory_ID");

                    b.HasIndex("Receipt_ID");

                    b.ToTable("ReceiptDetails", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Receipts", b =>
                {
                    b.Property<Guid>("Receipt_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Customer_ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Employee_ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("Method_ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("ReceiptDate")
                        .HasColumnType("datetime");

                    b.Property<Guid?>("Status_ID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("TotalPrice")
                        .HasColumnType("float");

                    b.Property<int>("TotalQuantity")
                        .HasColumnType("int");

                    b.HasKey("Receipt_ID");

                    b.HasIndex("Customer_ID");

                    b.HasIndex("Employee_ID");

                    b.HasIndex("Method_ID");

                    b.HasIndex("Status_ID");

                    b.ToTable("Receipts", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.RolesUser", b =>
                {
                    b.Property<Guid>("Role_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Role_ID");

                    b.ToTable("RolesUser", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Statuses", b =>
                {
                    b.Property<Guid>("Status_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("StatusName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Status_ID");

                    b.ToTable("Statuses", (string)null);
                });

            modelBuilder.Entity("MyBarBer.Data.Administrator", b =>
                {
                    b.HasOne("MyBarBer.Data.RolesUser", "RoleUser")
                        .WithMany("Administrators")
                        .HasForeignKey("Role_ID")
                        .HasConstraintName("FK_Admin_RolesUser");

                    b.Navigation("RoleUser");
                });

            modelBuilder.Entity("MyBarBer.Data.Employees", b =>
                {
                    b.HasOne("MyBarBer.Data.RolesUser", "RolesUser")
                        .WithMany("Employees")
                        .HasForeignKey("Role_ID")
                        .HasConstraintName("FK_Employees_RolesUser");

                    b.Navigation("RolesUser");
                });

            modelBuilder.Entity("MyBarBer.Data.FunctionDetails", b =>
                {
                    b.HasOne("MyBarBer.Data.FunctionsUser", "FunctionsUser")
                        .WithMany("FunctionDetails")
                        .HasForeignKey("Function_ID")
                        .HasConstraintName("FK_FunctionDetails_FunctionsUser");

                    b.HasOne("MyBarBer.Data.RolesUser", "RoleUser")
                        .WithMany("FunctionDetails")
                        .HasForeignKey("Role_ID")
                        .HasConstraintName("FK_FunctionDetails_RolesUser");

                    b.Navigation("FunctionsUser");

                    b.Navigation("RoleUser");
                });

            modelBuilder.Entity("MyBarBer.Data.ItemCategories", b =>
                {
                    b.HasOne("MyBarBer.Data.Categories", "Categories")
                        .WithMany("ItemCategories")
                        .HasForeignKey("Category_ID")
                        .HasConstraintName("FK_ItemCategories_Categories");

                    b.Navigation("Categories");
                });

            modelBuilder.Entity("MyBarBer.Data.ReceiptDetails", b =>
                {
                    b.HasOne("MyBarBer.Data.ItemCategories", "ItemCategories")
                        .WithMany("ReceiptDetails")
                        .HasForeignKey("ItemCategory_ID")
                        .HasConstraintName("FK_ReceiptDetails_ItemCategories");

                    b.HasOne("MyBarBer.Data.Receipts", "Receipts")
                        .WithMany("ReceiptDetails")
                        .HasForeignKey("Receipt_ID")
                        .HasConstraintName("FK_ReceiptDetails_Receipts");

                    b.Navigation("ItemCategories");

                    b.Navigation("Receipts");
                });

            modelBuilder.Entity("MyBarBer.Data.Receipts", b =>
                {
                    b.HasOne("MyBarBer.Data.Customers", "Customers")
                        .WithMany("Receipts")
                        .HasForeignKey("Customer_ID")
                        .HasConstraintName("FK_Receipts_Customers");

                    b.HasOne("MyBarBer.Data.Employees", "Employees")
                        .WithMany("Receipts")
                        .HasForeignKey("Employee_ID")
                        .HasConstraintName("FK_Receipts_Employees");

                    b.HasOne("MyBarBer.Data.Methods", "Methods")
                        .WithMany("Receipts")
                        .HasForeignKey("Method_ID")
                        .HasConstraintName("FK_Receipts_Methods");

                    b.HasOne("MyBarBer.Data.Statuses", "Statuses")
                        .WithMany("Receipts")
                        .HasForeignKey("Status_ID")
                        .HasConstraintName("FK_Receipts_Statuses");

                    b.Navigation("Customers");

                    b.Navigation("Employees");

                    b.Navigation("Methods");

                    b.Navigation("Statuses");
                });

            modelBuilder.Entity("MyBarBer.Data.Categories", b =>
                {
                    b.Navigation("ItemCategories");
                });

            modelBuilder.Entity("MyBarBer.Data.Customers", b =>
                {
                    b.Navigation("Receipts");
                });

            modelBuilder.Entity("MyBarBer.Data.Employees", b =>
                {
                    b.Navigation("Receipts");
                });

            modelBuilder.Entity("MyBarBer.Data.FunctionsUser", b =>
                {
                    b.Navigation("FunctionDetails");
                });

            modelBuilder.Entity("MyBarBer.Data.ItemCategories", b =>
                {
                    b.Navigation("ReceiptDetails");
                });

            modelBuilder.Entity("MyBarBer.Data.Methods", b =>
                {
                    b.Navigation("Receipts");
                });

            modelBuilder.Entity("MyBarBer.Data.Receipts", b =>
                {
                    b.Navigation("ReceiptDetails");
                });

            modelBuilder.Entity("MyBarBer.Data.RolesUser", b =>
                {
                    b.Navigation("Administrators");

                    b.Navigation("Employees");

                    b.Navigation("FunctionDetails");
                });

            modelBuilder.Entity("MyBarBer.Data.Statuses", b =>
                {
                    b.Navigation("Receipts");
                });
#pragma warning restore 612, 618
        }
    }
}
