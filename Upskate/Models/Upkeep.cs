using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Upskate.Models
{
    public class Upkeep
    {
        public int Id { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime DateCompleted { get; set; }

        [Required]
        public int BoardId { get; set; }

        public int UserProfileId { get; set; }
    }
}
