using datos.Models;
using datos.Operaciones;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("departamento/")]
    [ApiController]
    public class DepartamentoController : Controller
    {
        private DepartamentoDAO departamentoDAO = new DepartamentoDAO();

        [HttpGet("all")]
        public ActionResult<List<Departamento>> findAll()
        {
            return Ok(departamentoDAO.findAll());
        }

        [HttpPost("create")]
        public ActionResult<Departamento> createDepartamento([FromBody] Departamento departamento)
        {
            return Ok(departamentoDAO.create(departamento));
        }

        [HttpDelete("delete")]
        public ActionResult<Departamento> eliminarDepartamento(int id)
        {

            if (departamentoDAO.delete(id))
            {
                var data = new { Message = "Departamento eliminado con exito" };
                return new ObjectResult(data)
                {
                    StatusCode = 200
                };
            }
            else
            {
                var data = new { Message = "Error al eliminar el departamento" };
                return new ObjectResult(data)
                {
                    StatusCode = 400
                };
            }
        }

        [HttpPut("update")]
        public ActionResult<Departamento> updateDepartamento([FromBody] Departamento departamento)
        {
            return Ok(departamentoDAO.upDate(departamento));

        }
    }
}
