using System;

namespace BookStore.Models
{
    public class GeneralModel
    {
        public IEnumerable<Autors>? Autors { get; set; }
        public IEnumerable<Books>? Books { get; set; }
        public IEnumerable<Users>? Users { get; set; }
        public IEnumerable<Favorites>? Favorites { get; set; }
        public IEnumerable<Cart>? Cart { get; set; }
        public IEnumerable<Place>? Place { get; set; }
    }
}
