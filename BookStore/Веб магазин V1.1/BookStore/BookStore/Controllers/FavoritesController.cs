using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Data.Entity.Infrastructure.DependencyResolution;

namespace BookStore.Controllers
{
    public class FavoritesController : Controller
    {
        private ApplicationContextAutors db1;
        private ApplicationContextBooks db2;
        private ApplicationContextFavorites db3;
        private ApplicationContextCart db4;
        private ApplicationContextPlace db5;
        public FavoritesController(ApplicationContextAutors context1, ApplicationContextBooks context2, ApplicationContextFavorites context3, ApplicationContextCart context4, ApplicationContextPlace context5)
        {
            db1 = context1;
            db2 = context2;
            db3 = context3;
            db4 = context4;
            db5 = context5;
        }
        /*ПОДКЛЮЧАЮ БД*/
        /*выгрузка тупо всей базы данных в нужное представление*/
        public object BDResult()
        {
            var ListAutors = db1.Autors.ToList();
            var ListBooks = db2.Books.ToList();
            var ListFavorites = db3.Favorites.ToList();
            var ListCart = db4.Cart.ToList();
            var ListPlace = db5.Place.ToList();
            var General = new GeneralModel { Autors = ListAutors, Books = ListBooks, Favorites = ListFavorites, Cart = ListCart, Place = ListPlace };
            return General;
        }
        [HttpPost]
        public IActionResult Favorites()
        {
            Place place = new Place();
            foreach (var item in db5.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            return View(BDResult());
        }




        /*удаление из избранного*/
        [HttpGet]
        public async Task<IActionResult> Favorites(int? id)
        {
            Place place = new Place();
            foreach (var item in db5.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            Favorites favorites = db3.Favorites.Find(id);
            if (favorites != null)
            {
                db3.Favorites.Remove(favorites);
                await db3.SaveChangesAsync();
            }
            return View(BDResult());
        }
        /*удаление из избранного*/


        /*ПЛЮС 1 книгА*/
        [HttpGet]
        public async Task<EmptyResult> FavoritesPLUS(int? id)
        {
            Favorites favorites = db3.Favorites.Find(id);
            if (favorites != null)
            {
                favorites.quantity += 1;
                db3.Favorites.Update(favorites);
                await db3.SaveChangesAsync();
            }
            return new EmptyResult();
        }
        /*ПЛЮС 1 книгА*/



        /*МИНУС 1 книгА*/
        public async Task<EmptyResult> FavoritesMINUS(int? id)
        {
            Favorites favorites = db3.Favorites.Find(id);
            if(favorites.quantity != 1)
            {
                favorites.quantity -= 1;
            }
            db3.Favorites.Update(favorites);
            await db3.SaveChangesAsync();
            return new EmptyResult();
        }
        /*МИНУС 1 книгА*/





        /*Добавить из избранного в карзину*/
        [HttpGet]
        public async Task<EmptyResult> FavoritesAddCart()
        {
            await foreach(var i in db4.Cart)
            {
                await foreach (var f in db3.Favorites)
                {
                    if (f.ID != i.ID)
                    {
                        Cart cart = new Cart();
                        cart.ID = f.ID;
                        cart.idBooks = f.idBooks;
                        cart.quantity = f.quantity;
                        db4.Cart.Add(cart);
                        await db4.SaveChangesAsync();
                    }
                    
                }
            }
            
            return new EmptyResult();
        }
        /*Добавить из избранного в карзину*/






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
