using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

namespace Upskate.Models
{
    public class Board
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Required]
        public int BoardTypeId { get; set; }

        public BoardType BoardType { get; set; }

        [Required]
        public int DeckMaterialId { get; set; }

        public DeckMaterial DeckMaterial { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
