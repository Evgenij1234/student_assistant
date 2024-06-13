using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace HunterAndFisherman.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public ImagesController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var imageFilePath = Path.Combine(_env.ContentRootPath, "Images", imageName);

            if (System.IO.File.Exists(imageFilePath))
            {
                var imageBytes = System.IO.File.ReadAllBytes(imageFilePath);
                return File(imageBytes, "image/jpeg"); // Укажите соответствующий MIME-тип вашим изображениям
            }
            else
            {
                return NotFound();
            }
        }
    }
}
