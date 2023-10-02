const inputImage = document.querySelector("#upload");
const ronaldolanan_Image = document.querySelector("#ronaldolananImage");

// Clone original photo
const originalImage = ronaldolanan_Image.cloneNode(true);
const ronaldolama_miktari = document.querySelector("#ronaldolamaMiktari");

inputImage.addEventListener("change", async (e) => {
    const [file] = inputImage.files;

    // Show original photo
    ronaldolanan_Image.src = await fileToDataUri(file);

    // Save original photo 
    originalImage.src = await fileToDataUri(file);
    ronaldolama_miktari.value = 0;

    return false;
});

ronaldolama_miktari.oninput = (e) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;
    const canvasWidth = originalWidth;
    const canvasHeight = originalHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
    const originalImageData = context.getImageData(0, 0, originalWidth, originalHeight).data;
    if (parseInt(e.target.value) !== 0) {
        for (let y = 0; y < originalHeight; y += parseInt(e.target.value)) {
            for (let x = 0; x < originalWidth; x += parseInt(e.target.value)) {
                // Get position of pixel that will replaced
                const pixelIndexPosition = (x + y * originalWidth) * 4;
                // Replace the current pixel with new drawed square (saw this on code challange train)
                context.fillStyle = `rgba(
          ${originalImageData[pixelIndexPosition]},
          ${originalImageData[pixelIndexPosition + 1]},
          ${originalImageData[pixelIndexPosition + 2]},
          ${originalImageData[pixelIndexPosition + 3]}
        )`;
                context.fillRect(x, y, parseInt(e.target.value), parseInt(e.target.value));
            }
        }
    }
    ronaldolanan_Image.src = canvas.toDataURL();
};

function fileToDataUri(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(field);
    });
}
