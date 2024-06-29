using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using datos.Models;

namespace datos.Context;

public partial class PruebabextContext : DbContext
{
    public PruebabextContext()
    {
    }

    public PruebabextContext(DbContextOptions<PruebabextContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ciudad> Ciudads { get; set; }

    public virtual DbSet<Departamento> Departamentos { get; set; }

    public virtual DbSet<Pai> Pais { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=SEBASTIAN3\\SQLEXPRESS; DataBase=pruebabext; Trust Server Certificate=true; User Id=juan;Password=123123; MultipleActiveResultSets=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ciudad>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ciudad__3213E83F19171764");

            entity.ToTable("ciudad");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Ciudad1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ciudad");
            entity.Property(e => e.FkDepartamentoId).HasColumnName("fk_departamento_id");

            entity.HasOne(d => d.FkDepartamento).WithMany(p => p.Ciudads)
                .HasForeignKey(d => d.FkDepartamentoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ciudad__fk_depar__4E88ABD4");
        });

        modelBuilder.Entity<Departamento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__departam__3213E83FD8F76226");

            entity.ToTable("departamento");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Departamento1)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("departamento");
            entity.Property(e => e.FkPaisId).HasColumnName("fk_pais_id");

            entity.HasOne(d => d.FkPais).WithMany(p => p.Departamentos)
                .HasForeignKey(d => d.FkPaisId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__departame__fk_pa__4BAC3F29");
        });

        modelBuilder.Entity<Pai>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__pais__3213E83FFDC2D81E");

            entity.ToTable("pais");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Pais)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pais");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
