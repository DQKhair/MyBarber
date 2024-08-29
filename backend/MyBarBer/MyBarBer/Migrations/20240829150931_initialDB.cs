using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBarBer.Migrations
{
    /// <inheritdoc />
    public partial class initialDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Category_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Category_ID);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CustomerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CustomerPhone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    CustomerAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Customer_ID);
                });

            migrationBuilder.CreateTable(
                name: "FunctionsUser",
                columns: table => new
                {
                    Function_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FunctionName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FunctionIcon = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    FunctionRoute = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionsUser", x => x.Function_ID);
                });

            migrationBuilder.CreateTable(
                name: "Methods",
                columns: table => new
                {
                    Method_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MethodName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Methods", x => x.Method_ID);
                });

            migrationBuilder.CreateTable(
                name: "RolesUser",
                columns: table => new
                {
                    Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesUser", x => x.Role_ID);
                });

            migrationBuilder.CreateTable(
                name: "Statuses",
                columns: table => new
                {
                    Status_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StatusName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statuses", x => x.Status_ID);
                });

            migrationBuilder.CreateTable(
                name: "ItemCategories",
                columns: table => new
                {
                    ItemCategory_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemCategoryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ItemCategoryPrice = table.Column<double>(type: "float", nullable: false),
                    ItemCategoryDescription = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ItemCategoryImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Category_ID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemCategories", x => x.ItemCategory_ID);
                    table.ForeignKey(
                        name: "FK_ItemCategories_Categories",
                        column: x => x.Category_ID,
                        principalTable: "Categories",
                        principalColumn: "Category_ID");
                });

            migrationBuilder.CreateTable(
                name: "Administrator",
                columns: table => new
                {
                    Admin_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AdminName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdminAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AdminPhone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    AdminEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdminPassword = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrator", x => x.Admin_ID);
                    table.ForeignKey(
                        name: "FK_Admin_RolesUser",
                        column: x => x.Role_ID,
                        principalTable: "RolesUser",
                        principalColumn: "Role_ID");
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Employee_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmployeeAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    EmployeePhone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    EmployeeEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmployeePassword = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmployeeIsActive = table.Column<bool>(type: "bit", nullable: false),
                    Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Employee_ID);
                    table.ForeignKey(
                        name: "FK_Employees_RolesUser",
                        column: x => x.Role_ID,
                        principalTable: "RolesUser",
                        principalColumn: "Role_ID");
                });

            migrationBuilder.CreateTable(
                name: "FunctionDetails",
                columns: table => new
                {
                    FunctionDetail_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Desccription = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Role_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Function_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionDetails", x => x.FunctionDetail_ID);
                    table.ForeignKey(
                        name: "FK_FunctionDetails_FunctionsUser",
                        column: x => x.Function_ID,
                        principalTable: "FunctionsUser",
                        principalColumn: "Function_ID");
                    table.ForeignKey(
                        name: "FK_FunctionDetails_RolesUser",
                        column: x => x.Role_ID,
                        principalTable: "RolesUser",
                        principalColumn: "Role_ID");
                });

            migrationBuilder.CreateTable(
                name: "Receipts",
                columns: table => new
                {
                    Receipt_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalQuantity = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<double>(type: "float", nullable: false),
                    ReceiptDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Status_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Method_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Employee_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Customer_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Receipts", x => x.Receipt_ID);
                    table.ForeignKey(
                        name: "FK_Receipts_Customers",
                        column: x => x.Customer_ID,
                        principalTable: "Customers",
                        principalColumn: "Customer_ID");
                    table.ForeignKey(
                        name: "FK_Receipts_Employees",
                        column: x => x.Employee_ID,
                        principalTable: "Employees",
                        principalColumn: "Employee_ID");
                    table.ForeignKey(
                        name: "FK_Receipts_Methods",
                        column: x => x.Method_ID,
                        principalTable: "Methods",
                        principalColumn: "Method_ID");
                    table.ForeignKey(
                        name: "FK_Receipts_Statuses",
                        column: x => x.Status_ID,
                        principalTable: "Statuses",
                        principalColumn: "Status_ID");
                });

            migrationBuilder.CreateTable(
                name: "ReceiptDetails",
                columns: table => new
                {
                    ReceiptDetail_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReceiptDetailQuantity = table.Column<int>(type: "int", nullable: false),
                    ReceiptDetailPrice = table.Column<double>(type: "float", nullable: false),
                    ItemCategory_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Receipt_ID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceiptDetails", x => x.ReceiptDetail_ID);
                    table.ForeignKey(
                        name: "FK_ReceiptDetails_ItemCategories",
                        column: x => x.ItemCategory_ID,
                        principalTable: "ItemCategories",
                        principalColumn: "ItemCategory_ID");
                    table.ForeignKey(
                        name: "FK_ReceiptDetails_Receipts",
                        column: x => x.Receipt_ID,
                        principalTable: "Receipts",
                        principalColumn: "Receipt_ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Administrator_Role_ID",
                table: "Administrator",
                column: "Role_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Role_ID",
                table: "Employees",
                column: "Role_ID");

            migrationBuilder.CreateIndex(
                name: "IX_FunctionDetails_Function_ID",
                table: "FunctionDetails",
                column: "Function_ID");

            migrationBuilder.CreateIndex(
                name: "IX_FunctionDetails_Role_ID",
                table: "FunctionDetails",
                column: "Role_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemCategories_Category_ID",
                table: "ItemCategories",
                column: "Category_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptDetails_ItemCategory_ID",
                table: "ReceiptDetails",
                column: "ItemCategory_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptDetails_Receipt_ID",
                table: "ReceiptDetails",
                column: "Receipt_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_Customer_ID",
                table: "Receipts",
                column: "Customer_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_Employee_ID",
                table: "Receipts",
                column: "Employee_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_Method_ID",
                table: "Receipts",
                column: "Method_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_Status_ID",
                table: "Receipts",
                column: "Status_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Administrator");

            migrationBuilder.DropTable(
                name: "FunctionDetails");

            migrationBuilder.DropTable(
                name: "ReceiptDetails");

            migrationBuilder.DropTable(
                name: "FunctionsUser");

            migrationBuilder.DropTable(
                name: "ItemCategories");

            migrationBuilder.DropTable(
                name: "Receipts");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Methods");

            migrationBuilder.DropTable(
                name: "Statuses");

            migrationBuilder.DropTable(
                name: "RolesUser");
        }
    }
}
