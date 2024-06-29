using datos.Context;
using datos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace datos.Operaciones
{
    public class CiudadDAO
    {
        public PruebabextContext context = new PruebabextContext();

        public List<Ciudad> findAll()
        {
            var ciudad = context.Ciudads.ToList<Ciudad>();
            return ciudad;
        }

        public Ciudad findId(int id)
        {
            var ciudad = context.Ciudads.Where(p => p.Id == id).FirstOrDefault();
            return ciudad;
        }

        public Ciudad create(Ciudad ciudad)
        {
            try
            {
                var ciu2 = context.Ciudads.Where(c => c.Ciudad1 == ciudad.Ciudad1).FirstOrDefault();
                if (ciu2 == null)
                {
                    Ciudad ciu = new Ciudad();
                    ciu.Ciudad1 = ciudad.Ciudad1;
                    ciu.FkDepartamentoId = ciudad.FkDepartamentoId;
                    context.Ciudads.Add(ciu);
                    context.SaveChanges();
                    return ciu;
                }
                return null;
                
            }
            catch (Exception e)
            {
                throw new ApplicationException("Error al crear el objeto Pais", e);
            }
        }

        public Ciudad upDate(Ciudad ciudad)
        {
            try
            {
                var ciu = findId(ciudad.Id);
                if (ciu != null)
                {
                    ciu.Ciudad1 = ciudad.Ciudad1;
                    context.SaveChanges();
                    return ciu;
                }
                return null;
            }
            catch (Exception e)
            {
                throw new ApplicationException("Error al crear el objeto Pais", e);
            }
        }

        public bool delete(int id)
        {
            try
            {
                var ciudad = findId(id);
                if (ciudad != null)
                {
                    context.Ciudads.Remove(ciudad);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
