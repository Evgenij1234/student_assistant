using BookStore.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

//НЕ трогать
var builder = WebApplication.CreateBuilder(args);
//НЕ трогать



/*ДОБАВИЛ СЕССИЮ*/
// добавляем сервисы сессии
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
/*ДОБАВИЛ СЕССИЮ*/







/*ДОБАВИЛ БД*/
string? connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationContextAutors>(options => options.UseSqlServer(connection));//добавил автора
builder.Services.AddDbContext<ApplicationContextBooks>(options => options.UseSqlServer(connection));//добавил книги
builder.Services.AddDbContext<ApplicationContextUsers>(options => options.UseSqlServer(connection));//добавил пользователя
builder.Services.AddDbContext<ApplicationContextFavorites>(options => options.UseSqlServer(connection));//добавил контекст избранного
builder.Services.AddDbContext<ApplicationContextCart>(options => options.UseSqlServer(connection));//добавил контекст корзины
builder.Services.AddDbContext<ApplicationContextPlace>(options => options.UseSqlServer(connection));//добавил контекст места
/*ДОБАВИЛ БД*/

builder.Services.AddControllersWithViews();
var app = builder.Build();
//НЕ трогать

//статические файлы
app.UseDefaultFiles();
app.UseStaticFiles();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();

app.UseRouting();
//регистрация и вход
app.UseAuthentication();
app.UseAuthorization();

app.UseSession();   // добавляем middleware для работы с сессиями
//регистрация и вход

//стандартный маршрут
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Main_page}/{id?}");
//НЕ трогать
/*Не трогать*/
app.Run();
/*Не трогать*/