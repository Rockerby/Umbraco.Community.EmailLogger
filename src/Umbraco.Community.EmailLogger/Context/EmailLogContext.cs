using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Community.EmailLogger.Models;
using Microsoft.EntityFrameworkCore;

namespace Umbraco.Community.EmailLogger.Context
{
    public class EmailLogContext : DbContext
    {
        public EmailLogContext(DbContextOptions<EmailLogContext> options)
            : base(options)
        {
        }

        public required DbSet<EmailLog> EmailLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) =>
            modelBuilder.Entity<EmailLog>(entity =>
            {
                entity.ToTable("emailLogger");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.EmailLogUmbracoKey).HasColumnName("emailLogUmbracoKey");
                entity.Property(e => e.Message).HasColumnName("message");
                entity.Property(e => e.Subject).HasColumnName("subject");
                entity.Property(e => e.Recipients).HasColumnName("recipients");
            });
    }
}
