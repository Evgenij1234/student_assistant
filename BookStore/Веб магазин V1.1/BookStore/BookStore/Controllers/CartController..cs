using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
//using System.Data.Entity.Infrastructure.DependencyResolution;
namespace BookStore.Controllers
{
    public class CartController : Controller
    {
        private ApplicationContextBooks db2;
        private ApplicationContextCart db3;
        private ApplicationContextPlace db4;
        public CartController(ApplicationContextBooks context2, ApplicationContextCart context3, ApplicationContextPlace context4)
        {
            db2 = context2;
            db3 = context3;
            db4 = context4;
        }
        /*ПОДКЛЮЧАЮ БД*/
        /*выгрузка тупо всей базы данных в нужное представление*/
        private object BDResult()
        {
            var ListBooks = db2.Books.ToList();
            var ListCart = db3.Cart.ToList();
            var ListPlace = db4.Place.ToList();
            var General = new GeneralModel { Books = ListBooks, Cart = ListCart, Place = ListPlace };
            return General;
        }


        [HttpPost]
        public IActionResult Cart()
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            return View(BDResult());
        }
        /*удаление из карзины*/
        [HttpGet]
        public async Task<IActionResult> Cart(int? id)
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            Cart cart = db3.Cart.Find(id);
            if (cart != null)
            {
                db3.Cart.Remove(cart);
                await db3.SaveChangesAsync();
            }
            return View(BDResult());
        }
        /*удаление из карзины*/




        /*ПЛЮС 1 книгА*/
        [HttpGet]
        public async Task<EmptyResult> CartPLUS(int? id)
        {
            Cart cart = db3.Cart.Find(id);
            if (cart != null)
            {
                cart.quantity += 1;
                db3.Cart.Update(cart);
                await db3.SaveChangesAsync();
            }
            return new EmptyResult();
        }
        /*ПЛЮС 1 книгА*/



        /*МИНУС 1 книгА*/
        public async Task<EmptyResult> CartMINUS(int? id)
        {
            Cart cart = db3.Cart.Find(id);
            if (cart.quantity != 1)
            {
                cart.quantity -= 1;
            }
            db3.Cart.Update(cart);
            await db3.SaveChangesAsync();
            return new EmptyResult();
        }
        /*МИНУС 1 книгА*/



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
