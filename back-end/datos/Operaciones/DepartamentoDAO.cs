using datos.Context;
using datos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace datos.Operaciones
{
    public class DepartamentoDAO
    {
        public PruebabextContext context = new PruebabextContext();

        public List<Departamento> findAll()
        {
            var departamento = context.Departamentos.ToList<Departamento>();
            return departamento;
        }

        public Departamento findId(int id)
        {
            var departamento = context.Departamentos.Where(p => p.Id == id).FirstOrDefault();
            return departamento;
        }

        public Departamento create(Departamento departamento)
        {
            try
            {
                var dep2 = context.Departamentos.Where(d => d.Departamento1 == departamento.Departamento1).FirstOrDefault();
                if (dep2 == null)
                {
                    Departamento dep = new Departamento();
                    dep.Departamento1 = departamento.Departamento1;
                    dep.FkPaisId = departamento.FkPaisId;
                    context.Departamentos.Add(dep);
                    context.SaveChanges();
                    return dep;
                }
                return null;
            }
            catch (Exception e)
            {
                throw new ApplicationException("Error al crear el departamento", e);
            }
        }

        public Departamento upDate(Departamento departamento)
        {
            try
            {
                var dep = findId(departamento.Id);
                if (dep != null)
                {
                    dep.Departamento1 = departamento.Departamento1;
                    context.SaveChanges();
                    return dep;
                }
                return null;
            }
            catch (Exception e)
            {
                throw new ApplicationException("Error al modificar el departamento", e);
            }
        }

        public bool delete(int id)
        {
            try
            {
                var departamento = findId(id);
                if (departamento != null)
                {
                    var ciudad = context.Ciudads.Where(c => c.FkDepartamentoId == id);
                    context.Ciudads.RemoveRange(ciudad);

                    context.Departamentos.Remove(departamento);
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
