using System;
using System.Collections.Generic;

namespace datos.Models;

public partial class Departamento
{
    public int Id { get; set; }

    public string Departamento1 { get; set; } = null!;

    public int FkPaisId { get; set; }

    public virtual ICollection<Ciudad>? Ciudads { get; set; } = new List<Ciudad>();

    public virtual Pai? FkPais { get; set; } = null!;
}
