



  export  const getRandomColor = (alpha = 0.5) => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        // Chuyển đổi sang định dạng rgba
        const rgb = hexToRgb(color);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    };

// Hàm chuyển đổi màu hex sang rgb
  export  const hexToRgb = (hex) => {
        let r = 0, g = 0, b = 0;
        // Loại bỏ dấu #
        hex = hex.replace(/^#/, '');
        // Chuyển đổi
        if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        return { r, g, b };
    };

