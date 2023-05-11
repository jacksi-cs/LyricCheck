import os
from sys import platform

if __name__ == "__main__":

    # Use chromedriver based on OS
    if platform == "win32":
        PATH = "./guitests/chromedriver.exe"
    elif platform == "linux":
        PATH = "./guitests/chromedriver_linux"
    elif platform == "darwin":
        PATH = "./guitests/chromedriver_mac"
    else:
        print("Unsupported OS")
        exit(-1)

    # Run all of the gui tests
    os.system("python3 ./guitests/navbarTests.py " + PATH)
    os.system("python3 ./guitests/topSongsTests.py " + PATH)
    os.system("python3 ./guitests/topArtistsTests.py " + PATH)
    os.system("python3 ./guitests/topCountriesTests.py " + PATH)

    os.system("python3 ./guitests/searchArtistTests.py " + PATH)
    os.system("python3 ./guitests/searchSongTests.py " + PATH)
    os.system("python3 ./guitests/searchCountryTests.py " + PATH)

    os.system("python3 ./guitests/sortArtistTests.py " + PATH)
    os.system("python3 ./guitests/sortSongTests.py " + PATH)
    os.system("python3 ./guitests/sortCountryTests.py " + PATH)

    os.system("python3 ./guitests/filterArtistTests.py " + PATH)
    os.system("python3 ./guitests/filterSongTests.py " + PATH)
    os.system("python3 ./guitests/filterCountryTests.py " + PATH)
