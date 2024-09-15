using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBarBer.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReceiptTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Employee2_ID",
                table: "Receipts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Employee2_Time",
                table: "Receipts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Employee3_ID",
                table: "Receipts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Employee3_Time",
                table: "Receipts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReceiptDetailName",
                table: "ReceiptDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "EmployeeDate",
                table: "Employees",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Employee2_ID",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "Employee2_Time",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "Employee3_ID",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "Employee3_Time",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "ReceiptDetailName",
                table: "ReceiptDetails");

            migrationBuilder.DropColumn(
                name: "EmployeeDate",
                table: "Employees");
        }
    }
}
