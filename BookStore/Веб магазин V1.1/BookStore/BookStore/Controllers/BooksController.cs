using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Data.Entity.Infrastructure.DependencyResolution;
namespace BookStore.Controllers
{
    public class BooksController : Controller
    {
        private ApplicationContextAutors db1;
        private ApplicationContextBooks db2;
        private ApplicationContextFavorites db3;
        private ApplicationContextCart db4;
        private ApplicationContextPlace db5;
        public BooksController(ApplicationContextAutors context1, ApplicationContextBooks context2,
            ApplicationContextFavorites context3, ApplicationContextCart context4, ApplicationContextPlace context5)
        {
            db1 = context1;
            db2 = context2;
            db3 = context3;
            db4 = context4;
            db5 = context5;
        }
        /*ПОДКЛЮЧАЮ БД*/
        /*выгрузка таблиц автор и книга в страницу книги представление*/

        
        private object BDResult()
        {
            var ListAutors = db1.Autors.ToList();
            var ListBooks = db2.Books.ToList();
            var ListPlace = db5.Place.ToList();
            var General = new GeneralModel { Autors = ListAutors, Books = ListBooks, Place = ListPlace};
            return General;
        }
        public IActionResult Book_page(string id)
        {
            Place place = new Place();
            foreach (var item in db5.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            ViewData["Message"] = id;
            return View(BDResult());
        }
        /*выгрузка тупо всей базы данных в нужное представление*/

        /*обработка добавления в избранное*/
        [HttpGet]
        public async Task<EmptyResult> Book_pageAddFavorites(Favorites favorites)
        {
            int schet = 0;
            Favorites favorit = new Favorites();
            foreach(var item in db3.Favorites)
            {
                if(item.ID == favorites.ID)
                {
                    schet = 1;
                }
            }
            favorit = favorites;
            if(schet != 1)
            {
                favorit.quantity = 1;
                db3.Favorites.Add(favorit);
                await db3.SaveChangesAsync();
            }
            return new EmptyResult();
        }
        /*обработка добавления в избранное*/

        /*обработка добавления в карзину*/
        [HttpGet]
        public async Task<EmptyResult> CreateBook_pageAddCart(Cart cart)
        {
            int schet = 0;
            Cart cart1 = new Cart();
            foreach (var item in db4.Cart)
            {
                if (item.ID == cart.ID)
                {
                    schet = 1;
                }
            }
            cart1 = cart;
            if (schet != 1)
            {
                cart1.quantity = 1;
                db4.Cart.Add(cart1);
                await db4.SaveChangesAsync();
            }
            return new EmptyResult();
        }
        /*обработка добавления в карзину*/







        //частичные представления
        public IActionResult Header()
        {
            return PartialView(BDResult());
        }
        public IActionResult Footer()
        {
            return PartialView(BDResult());
        }
        //частичные представления
    }
}
