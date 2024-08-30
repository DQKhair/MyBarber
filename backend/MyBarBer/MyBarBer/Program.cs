using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add Repository and unit of work pattern
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
// add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddLogging();
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add MyDB 
builder.Services.AddDbContext<MyDBContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("MyDB"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
