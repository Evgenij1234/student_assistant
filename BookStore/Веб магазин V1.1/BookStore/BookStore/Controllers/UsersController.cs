using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace BookStore.Controllers
{
    public class UsersController : Controller
    {
        /*ПОДКЛЮЧАЮ БД*/
        private ApplicationContextAutors db1;
        private ApplicationContextBooks db2;
        private ApplicationContextUsers db3;
        private ApplicationContextPlace db4;
        public UsersController(ApplicationContextAutors context1, ApplicationContextBooks context2, ApplicationContextUsers context3, ApplicationContextPlace context4)
        {
            db1 = context1;
            db2 = context2;
            db3 = context3;
            db4 = context4;
        }
        /*ПОДКЛЮЧАЮ БД*/
        /*выгрузка тупо всей базы данных в нужное представление*/
        private object BDResult()
        {
            var ListAutors = db1.Autors.ToList();
            var ListBooks = db2.Books.ToList();
            var ListUsers = db3.Users.ToList();
            var ListPlace = db4.Place.ToList();
            var General = new GeneralModel { Autors = ListAutors, Books = ListBooks, Users = ListUsers, Place = ListPlace };
            return General;
        }
        //Вход в личный кабинет
        public IActionResult Personal_area1( string? EmailUsers, string? PaswordlUsers)
        {
            Place place = new Place();
            foreach (var item in db4.Place)
            {
                place = item;
            }
            ViewData["locality"] = place.place;
            if (EmailUsers != null & PaswordlUsers != null)
            {
                foreach (var user in db3.Users)
                {
                    if (user.EmailUsers == EmailUsers & user.PaswordlUsers == PaswordlUsers)
                    {
                        ViewData["ID"] = user.ID;
                        ViewData["NameUsers"] = user.NameUsers;
                        ViewData["FemileUsers"] = user.FemileUsers;
                        ViewData["SurnameUsers"] = user.SurnameUsers;
                        ViewData["EmailUsers"] = user.EmailUsers;
                        ViewData["DateUsers"] = user.DateUsers;
                        ViewData["PaswordlUsers"] = user.PaswordlUsers;
                        ViewData["GenderUsers"] = user.GenderUsers;
                        return View("Personal_area");
                    }
                }
            }
            return View("Error");
        }

        //Регистрация
        public ActionResult Personal_area2(Users User)
        {
            if (User.EmailUsers != null & User.PaswordlUsers != null)
            {
                int id1 = 0;
                foreach (var user in db3.Users)
                {
                    if (user.ID >= id1)
                    {
                        id1 = user.ID;
                    }
                    if (user.EmailUsers == User.EmailUsers)
                    {
                        return View("Error2");
                    }
                }
                User.ID = id1 + 1;
                db3.Users.Add(User);
                db3.SaveChanges();
                ViewData["ID"] = User.ID;
                ViewData["NameUsers"] = User.NameUsers;
                ViewData["FemileUsers"] = User.FemileUsers;
                ViewData["SurnameUsers"] = User.SurnameUsers;
                ViewData["EmailUsers"] = User.EmailUsers;
                ViewData["DateUsers"] = User.DateUsers;
                ViewData["PaswordlUsers"] = User.PaswordlUsers;
                ViewData["GenderUsers"] = User.GenderUsers;
                return View("Personal_area");
            }
            else { return View("Error3"); }
        }

        //асинхронное обнавление данных пользователя
        [HttpPost]
        public async Task<IActionResult> Update(Users user)
        {
            db3.Users.Update(user);
            await db3.SaveChangesAsync();
            ViewData["ID"] = user.ID;
            ViewData["NameUsers"] = user.NameUsers;
            ViewData["FemileUsers"] = user.FemileUsers;
            ViewData["SurnameUsers"] = user.SurnameUsers;
            ViewData["EmailUsers"] = user.EmailUsers;
            ViewData["DateUsers"] = user.DateUsers;
            ViewData["PaswordlUsers"] = user.PaswordlUsers;
            ViewData["GenderUsers"] = user.GenderUsers;
            return View("Personal_area");
        }


        //асинхронное удаление данных пользователя
        public async Task<IActionResult> Delete(int? id)
        {
            Users user = db3.Users.Find(id);
            if (user != null)
            {
                db3.Users.Remove(user);
                await db3.SaveChangesAsync();
            }
            return View("View_Delete");
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
