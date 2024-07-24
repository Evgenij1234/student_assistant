using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
//using System.Data.Entity.Infrastructure.DependencyResolution;
namespace BookStore.Controllers
{
    public class DesignController : Controller
    {
        private ApplicationContextBooks db2;
        private ApplicationContextCart db3;
        private ApplicationContextPlace db4;

        public DesignController(ApplicationContextBooks context2, ApplicationContextCart context3, ApplicationContextPlace context4)
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
        public IActionResult Design(string id)
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            ViewData["Message"] = id;
            return View(BDResult());
        }


        public IActionResult Сheck(string? locality, string? way_to_get1, string? way_to_get2, string? address, string? apartment, string? email, string? full_name, string? telephone)
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            int schet2 = 0;
            foreach (var item in db3.Cart)
            {
                if (item.quantity != null)
                {
                    schet2 += 1;
                }
            }
            if(schet2 != 0)
            {
                if (locality != null && address != null && apartment != null && email != null && full_name != null && telephone != null)
                {
                    ViewData["locality"] = locality;

                    if (way_to_get1 == "on")
                    {
                        ViewData["way_to_get1"] = "Курьером";
                    }
                    if (way_to_get2 == "on")
                    {
                        ViewData["way_to_get2"] = "Почтой России";
                    }
                    if (way_to_get1 == null && way_to_get2 == null)
                    {
                        ViewData["way_to_get1"] = "Не указанно";
                    }



                    ViewData["address"] = address;
                    ViewData["apartment"] = apartment;
                    ViewData["email"] = email;
                    ViewData["full_name"] = full_name;
                    ViewData["telephone"] = telephone;
                    return View(BDResult());
                }
                else
                {
                    return View("Error4");
                }
            }
            else { return View("Error6"); }
            
        }


        public IActionResult about_Us()
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            return View();
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