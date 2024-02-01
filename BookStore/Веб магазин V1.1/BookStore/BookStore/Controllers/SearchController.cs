using BookStore.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Controllers
{
    public class SearchController : Controller
    {
        /*ПОДКЛЮЧАЮ БД*/
        private ApplicationContextAutors db1;
        private ApplicationContextBooks db2;
        private ApplicationContextPlace db4;

        public SearchController(ApplicationContextAutors context1, ApplicationContextBooks context2, ApplicationContextPlace context4)
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
        public IActionResult Search(string? boeviki, string? detektiv, string? love, string? prikluch, string? fantastika, string? fentezi, string? autor, string? age, string? name)
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;

            if (boeviki != null)
            {
                ViewData["boeviki"] = "Боевики и Остросюжетная литература";
            }
            else
            {
                ViewData["boeviki"] = "";
            }
            if (detektiv != null)
            {
                ViewData["detektiv"] = "Детективы";
            }
            else
            {
                ViewData["detektiv"] = "";
            }
            if (love != null)
            {
                ViewData["love"] = "Любовные романы";
            }
            else
            {
                ViewData["love"] = "";
            }
            if (prikluch != null)
            {
                ViewData["prikluch"] = "Приключения";
            }
            else
            {
                ViewData["prikluch"] = "";
            }
            if (fantastika != null)
            {
                ViewData["fantastika"] = "Фантастика";
            }
            else
            {
                ViewData["fantastika"] = "";
            }
            if (fentezi != null)
            {
                ViewData["fentezi"] = "Фентези";
            }
            else
            {
                ViewData["fentezi"] = "";
            }



            if (autor != null)
            {
                ViewData["autor"] = autor;
            }
            else
            {
                ViewData["autor"] = "";
            }
            if (age != null)
            {
                ViewData["age"] = age;
            }
            else
            {
                ViewData["age"] = "";
            }



            if (name != null)
            {
                ViewData["name"] = name;
            }
            else
            {
                ViewData["name"] = "";
            }







            return View(BDResult());
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
