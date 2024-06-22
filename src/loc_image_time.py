def loc_image_time(location_metadata): #take in the raw text data u sent me @chia
    #returns a dictionary with camera id as key and image url and timestamp as value
    location_unprocessed = location_metadata['items'][0]['cameras']
    return_dict = {}
    for location in location_unprocessed:
        camera_id = location['camera_id']
        image_url = location['image']
        time = location['timestamp']
        return_dict[camera_id] = [image_url, time]

    # api_status = location_metadata['api_info']['status']
    # print(api_status) // api_status = healthy means working

    return return_dict

    