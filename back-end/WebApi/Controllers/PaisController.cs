using datos.Models;
using datos.Operaciones;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("pais/")]
    [ApiController]
    public class PaisController : Controller
    {
        private PaisDAO paisDAO = new PaisDAO();

        [HttpGet("all")]
        public ActionResult<List<Pai>> findAll()
        {
            return Ok(paisDAO.findAll());
        }

        [HttpPost("create")]
        public ActionResult<Pai> createPais([FromBody]Pai pais)
        {
            return Ok(paisDAO.create(pais));
        }

        [HttpDelete("delete")]
        public ActionResult<Pai> eliminarPais(int id)
        {
            if (paisDAO.delete(id))
            {
                var data = new { Message = "Pais eliminado con exito" };
                return new ObjectResult(data)
                {
                    StatusCode = 200
                };
            }
            else {
                var data = new { Message = "Error al eliminar el pais" };
                return new ObjectResult(data)
                {
                    StatusCode = 400
                };
            }
        }

        [HttpPut("update")]
        public ActionResult<Pai> updatePais([FromBody] Pai pais)
        {
            return Ok(paisDAO.upDate(pais));
        }
    }
}
