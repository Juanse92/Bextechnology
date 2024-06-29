using System;
using System.Collections.Generic;

namespace datos.Models;

public partial class Pai
{
    public int Id { get; set; }

    public string Pais { get; set; } = null!;

    public virtual ICollection<Departamento> Departamentos { get; set; } = new List<Departamento>();
}
