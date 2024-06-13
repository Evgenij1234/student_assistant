using HunterAndFisherman.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace HunterAndFisherman.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")] // Указываем, что контроллер производит JSON-данные
    public class NesiedGribController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NesiedGribController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSiedGrib()
        {
            try
            {
                var entities = await _context.Nesied.ToListAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

