import numpy as np
import rasterio
from rasterio.transform import from_origin

# npy 파일을 로드하는 코드
image_np= np.load('past_sst_to_future_sst_st_sst_201601.npy')

try:
    # Your code here

# from_origin(west, north, xsize, ysize)
    transform = from_origin(0, 90, 0.75, 0.75)
    for i in range(image_np.shape[2]):
        # Slice the array to only include up to the 241st row and 480th column
        sliced_array = image_np[:241, :480, i]

# npy => gtiff 만드는 라이브러리
        with rasterio.open(f'result_{i+1}.tiff', 'w', driver='GTiff',
                           height=sliced_array.shape[0], width=sliced_array.shape[1],
                           count=1, dtype=sliced_array.dtype,
                           src_crs = 'EPSG:4326',
                           dst_crs='EPSG:4326',
                           transform=transform) as dst:
            dst.write(sliced_array, 1)
        
except Exception as e:
    print(f"An error occurred: {e}")