# Tooch Music Page

A music artist website for Tooch Magooch (AKA MRS. MUNYsUNN) featuring a unique visual design with floating photo bubbles, a lollipop-shaped music player, and more.

## Features

- **Photo Bubbles**: Random photos from the Dropbox folder appear in floating bubbles in the background
- **Lollipop Music Player**: Custom-designed music player with a unique candy-themed interface
- **Responsive Design**: Works on desktop and mobile devices
- **Artist Dashboard**: Secure area for the artist to manage content

## Directory Structure

```
/
├── css/                  # CSS stylesheets
│   └── style.css         # Main stylesheet
├── js/                   # JavaScript files
│   ├── auth.js           # Authentication logic
│   ├── dashboard.js      # Dashboard functionality
│   ├── dropboxUtils.js   # Utilities for Dropbox integration
│   ├── imageConfig.js    # Image configuration
│   ├── main.js           # Main site functionality
│   ├── photoBubbles.js   # Photo bubbles implementation
│   └── player.js         # Music player functionality
├── dropbox/              # Local folder for images
├── dashboard.html        # Artist dashboard page
├── index.html            # Main website
├── login.html            # Login page
└── README.md             # This file
```

## Photo Bubbles Feature

The photo bubbles feature displays images from the Dropbox folder in floating bubbles that blend with the existing smoke animation in the background. The bubbles are semi-transparent and randomly appear at the bottom of the screen, floating upward with a gentle animation.

### How it Works

1. Images are loaded from the `dropbox` folder via the `imageConfig.js` file
2. The `photoBubbles.js` script creates bubbles with random sizes, positions, and timing
3. Each bubble contains an image and uses CSS blend modes to integrate with the background
4. Bubbles animate upward and gradually fade out, similar to the existing smoke effect

## Deployment

To prepare for deployment:

1. Run `check-deployment-fixed.bat` to verify all files are present
2. If any issues are found, fix them before proceeding
3. Follow the deployment instructions in `DEPLOYMENT.md`

## Adding New Images

To add new images to the photo bubbles:

1. Upload your images to the Dropbox folder: 
   https://www.dropbox.com/scl/fo/pmba2i6o1ke90gdq8rb8p/ADIIe8iedOUPyoWlWJnybAY?rlkey=15tfkmx82t79e7b0bir3vi6ih&e=1&st=4u6cuj0a&dl=0

2. Update the `imageConfig.js` file to include references to your new images:
   ```javascript
   // Add a new photo bubble image
   photoBubble9: createDropboxUrl("your-new-image.jpg"),
   ```

3. The photos will automatically appear in the floating bubbles

## Maintenance Scripts

- `cleanup.bat`: Removes duplicate and old files
- `organize.bat`: Ensures all files are in the correct directories
- `check-deployment-fixed.bat`: Verifies all required files are present
- `downloadSampleImages2.js`: Downloads sample images for testing

## Debugging

To enable debug mode and see information about the photo bubbles:
1. Open the site with the debug parameter: `index.html?debug=true`
2. A debug panel will appear in the bottom-left corner showing information about loaded images

## Dropbox Integration

The site uses Dropbox to store and serve images. The integration works as follows:

1. Images are stored in a shared Dropbox folder
2. The `imageConfig.js` file contains references to these images
3. The `getDirectDropboxImageUrl()` function converts Dropbox shared links to direct download links
4. The photo bubbles script randomly selects images to display in the floating bubbles

## Browser Compatibility

Tested and working in:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Credits

- Font Awesome for icons
- Tailwind CSS for styling
- Lorem Picsum for sample images
