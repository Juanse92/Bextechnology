using datos.Context;
using datos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace datos.Operaciones
{
    public class PaisDAO
    {
        public PruebabextContext context = new PruebabextContext();

        public List<Pai> findAll() { 
            var pais = context.Pais.ToList<Pai>();
            return pais;
        }

        public Pai findId(int id)
        {
            var pai = context.Pais.Where(p => p.Id == id).FirstOrDefault();
            return pai;
        }

        public Pai create(Pai pais) {
            try {
                var pais2 = context.Pais.Where(p => p.Pais == pais.Pais).FirstOrDefault();
                if(pais2 ==null){
                    Pai pai = new Pai();
                    pai.Pais = pais.Pais;
                    context.Pais.Add(pai);
                    context.SaveChanges();
                    return pai;
                }return null;
            }
            catch(Exception e)
            {
                throw new ApplicationException("Error al crear el objeto Pais", e);
            }
        }

        public Pai upDate(Pai pais)
        {
            try
            {
                var pai = findId(pais.Id);
                if (pai != null) {
                    pai.Pais = pais.Pais;
                    context.SaveChanges();
                    return pai;
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
                var pais = findId(id);
                if (pais != null)
                {
                    var departamento = context.Departamentos.Where(d => d.FkPaisId == id);
                    foreach (var d in departamento)
                    {
                        var ciudad = context.Ciudads.Where(c => c.FkDepartamentoId == d.Id);
                        context.Ciudads.RemoveRange(ciudad);
                    }
                    context.Departamentos.RemoveRange(departamento);

                    context.Pais.Remove(pais);
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
