using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Upskate.Models;
using Upskate.Repositories;

namespace Upskate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeckMaterialController : ControllerBase
    {
        private readonly IDeckMaterialRepository _deckMaterialRepository;
        public DeckMaterialController(IDeckMaterialRepository deckMaterialRepository)
        {
            _deckMaterialRepository = deckMaterialRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var deckMaterials = _deckMaterialRepository.GetAllDeckMaterials();

            return Ok(deckMaterials);
        }
    }
}
