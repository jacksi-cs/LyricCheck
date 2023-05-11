import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

import sys

PATH = ""

URL = "https://www.lyriccheck.me/"
# URL = "http://127.0.0.1:3000/"


class TestNavbar(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        s = Service(PATH)
        cls.driver = webdriver.Chrome(executable_path=PATH, options=chrome_options)
        cls.driver.get(URL)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testTopSongs(self):
        # Testing 'Songs' in Navbar
        songs = self.driver.find_element(By.XPATH, ".//a[@href='/song']")
        self.driver.execute_script("arguments[0].click()", songs)
        currenturl = self.driver.current_url
        assert currenturl == URL + "song"

    def testTopArtists(self):
        # Testing "Artists" in Navbar
        artists = self.driver.find_element(By.XPATH, ".//a[@href='/artist']")
        self.driver.execute_script("arguments[0].click()", artists)
        currenturl = self.driver.current_url
        assert currenturl == URL + "artist"

    def testNavbarProfaneCountries(self):
        countries = self.driver.find_element(By.XPATH, ".//a[@href='/country']")
        self.driver.execute_script("arguments[0].click()", countries)
        currenturl = self.driver.current_url
        assert currenturl == URL + "country"

    def testNavbarAbout(self):
        about_us = self.driver.find_element(By.XPATH, ".//a[@href='/about']")
        self.driver.execute_script("arguments[0].click()", about_us)
        currenturl = self.driver.current_url
        assert currenturl == URL + "about"

    def testNavbarSearch(self):
        search = self.driver.find_element(By.XPATH, ".//a[@href='/search']")
        self.driver.execute_script("arguments[0].click()", search)
        currenturl = self.driver.current_url
        assert currenturl == URL + "search"


if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=["first-arg-is-ignored"])
