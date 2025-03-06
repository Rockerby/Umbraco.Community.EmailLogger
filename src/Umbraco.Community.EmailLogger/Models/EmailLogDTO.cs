using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Umbraco.Community.EmailLogger.Models
{
    public class EmailLog
    {
        public int Id { get; set; }
        public Guid EmailLogUmbracoKey { get; set; }
        public required string Recipients { get; set; }
        public required string Subject { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool IsSuccessful { get; set; }
    }
}
