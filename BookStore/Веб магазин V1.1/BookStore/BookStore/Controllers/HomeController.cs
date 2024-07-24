using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
//using System.Data.Entity.Infrastructure.DependencyResolution;

namespace BookStore.Controllers
{
    public class HomeController : Controller
    {
        /*ПОДКЛЮЧАЮ БД*/
        private ApplicationContextAutors db1;
        private ApplicationContextBooks db2;
        private ApplicationContextPlace db4;
        public HomeController(ApplicationContextAutors context1, ApplicationContextBooks context2, ApplicationContextPlace context4)
        {
            db1 = context1;
            db2 = context2;
            db4 = context4;
        }
        /*ПОДКЛЮЧАЮ БД*/
        /*выгрузка тупо всей базы данных в нужное представление*/
        private object BDResult()
        {
            var ListAutors = db1.Autors.ToList();
            var ListBooks = db2.Books.ToList();
            var ListPlace = db4.Place.ToList();
            var General = new GeneralModel { Autors = ListAutors, Books = ListBooks, Place = ListPlace };
            return General;
        }
        //стандартный путь
        
        
        public IActionResult Main_page()
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            return View(BDResult());
        }

        [HttpPost]
        public async Task<IActionResult> Main_page(string? location1)
        {

            Place place = new Place();
            place.ID = 1;
            place.place = location1;
            db4.Place.Update(place);
            await db4.SaveChangesAsync();
            ViewData["locality"] = place.place;
            return View("place");
        }



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