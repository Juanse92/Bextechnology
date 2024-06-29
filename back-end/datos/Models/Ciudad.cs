using System;
using System.Collections.Generic;

namespace datos.Models;

public partial class Ciudad
{
    public int Id { get; set; }

    public string Ciudad1 { get; set; } = null!;

    public int FkDepartamentoId { get; set; }

    public virtual Departamento? FkDepartamento { get; set; } = null!;
}
