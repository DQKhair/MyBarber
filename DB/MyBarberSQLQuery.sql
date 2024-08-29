create table Functions
(
Function_ID nvarchar(100) not null primary key,
FunctionName nvarchar(100),
FunctionIcon nvarchar(100),
FunctionRoute nvarchar(100),
)

create table Roles (
Role_ID nvarchar(100),
RoleName nvarchar(100)
)

delete table FunctionDetails(
	FunctionDetail_ID nvarchar(100) not null primary key,
	Role_Id nvarchar(100),
	Function_ID nvarchar(100),
	constraint FK_FunctionDetails_Roles Foreign key (Role_ID)
	references Roles(Role_ID),
	constraint FK_FunctionDetails_Functions Foreign key (Function_ID)
	references Functions(Function_ID)
)

create table Administrator (
	Admin_ID nvarchar(100) not null primary key,
	AdminName nvarchar(100),
	AdminAddress nvarchar(500),
	AdminPhone nvarchar(11),
	AdminEmail nvarchar(100),
	AdminPasswword nvarchar(100)
	Role_ID nvarchar(100),
	constraint FK_Administrator_Roles Foreign key (Role_ID)
	references Roles(Role_ID)
)

create table Employees (
	Employee_ID nvarchar(100) not null primary key,
	EmployeeName nvarchar(100) ,
	EmployeeAddress nvarchar(500),
	EmployeePhone nvarchar(11),
	EmployeeEmail nvarchar(100),
	EmployeePassword nvarchar(100),
	EmployeeIsActive bit,
	Role_ID nvarchar(100),
	constraint FK_Employees_Roles Foreign key (Role_ID)
	references Roles (Role_ID)
)

create table Customers (
	Customer_ID nvarchar(100) not null primary key,
	CustomerName nvarchar(100),
	CustomerPhone nvarchar(11),
	CustomerAddress nvarchar(500),
)

create table Methods (
	Method_ID int identity(1,1) primary key,
	MethodName nvarchar(100)
)

create table ReceiptStatus (
	Status_ID int identity(1,1) primary key,
	StatusName nvarchar(100)
)

create table Receipts(
	Receipt_ID nvarchar(100),
	TotalPrice float,
	TotalQuantity int,
	Date datetime,
	Status_ID int,
	Method_ID int,
	Employee_ID nvarchar(100),
	Customer_ID nvarchar(100),
	constraint FK_Receipts_Status foreign key (Status_ID)
	references ReceiptStatus(Status_ID),
	constraint FK_Receipts_Methods foreign key (Method_ID)
	references Methods(Method_ID)
)

create table Categories(
	Category_ID nvarchar(100) not null primary key,
	CategoryName nvarchar(100)
)

create table ItemCategories(
	ItemCategory_ID nvarchar(100),
	ItemCategoryName nvarchar(100),
	ItemCategoryPrice float,
	ItemCategoryDescription nvarchar(500),
	ItemCategoryImage nvarchar(1000),
	Category_ID nvarchar(100),
	constraint FK_ItemCategories_Categories foreign key (Category_ID)
	references Categories(Category_ID)
)

create table ReceiptDetails (
	ReceiptDetail_ID nvarchar(100) not null primary key,
	ReceiptDetailQuantity int,
	ReceiptDetailPrice float,
	ItemCategory_ID nvarchar(100)
	constraint FK_ReceiptDetails_ItemCategories foreign key (ItemCategory_ID)
	references ItemCategories (ItemCategory_ID)
)