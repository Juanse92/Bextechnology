using datos.Models;
using datos.Operaciones;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("ciudad/")]
    [ApiController]
    public class CiudadController : Controller
    {
        private CiudadDAO ciudadDAO = new CiudadDAO();

        [HttpGet("all")]
        public ActionResult<List<Ciudad>> findAll()
        {
            return Ok(ciudadDAO.findAll());
        }

        [HttpPost("create")]
        public ActionResult<Ciudad> createCiudad([FromBody] Ciudad ciudad)
        {
            return Ok(ciudadDAO.create(ciudad));
        }

        [HttpDelete("delete")]
        public ActionResult<Ciudad> eliminarCiudad(int id)
        {
            if (ciudadDAO.delete(id))
            {
                var data = new { Message = "Ciudad eliminado con exito" };
                return new ObjectResult(data)
                {
                    StatusCode = 200
                };
            }
            else
            {
                var data = new { Message = "Error al eliminar el ciudad" };
                return new ObjectResult(data)
                {
                    StatusCode = 400
                };
            }
        }

        [HttpPut("update")]
        public ActionResult<Ciudad> updateCiudad([FromBody] Ciudad ciudad)
        {
            return Ok(ciudadDAO.upDate(ciudad));
        }
    }
}
