import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

import sys
import time

PATH = ""

URL = "https://www.lyriccheck.me/country"
# URL = "http://127.0.0.1:3000/country"


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

    def testSearchCountryName(self):
        try:
            open_filter = self.driver.find_element(
                By.XPATH, ".//button[@class='accordion-button collapsed']"
            )
            self.driver.execute_script("arguments[0].click()", open_filter)
        except NoSuchElementException:
            pass

        search_bar = self.driver.find_element(By.XPATH, ".//input[@id='mui-1']")
        time.sleep(1)
        search_bar.send_keys("China")
        submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
        self.driver.execute_script("arguments[0].click()", submit)
        time.sleep(1)
        country_names = self.driver.find_elements(
            By.XPATH, ".//div[@aria-colindex=2]//span//mark"
        )

        for name in country_names:
            assert name.text == "China"

    def testSearchRegionName(self):
        try:
            open_filter = self.driver.find_element(
                By.XPATH, ".//button[@class='accordion-button collapsed']"
            )
            self.driver.execute_script("arguments[0].click()", open_filter)
        except NoSuchElementException:
            pass

        search_bar = self.driver.find_element(By.XPATH, ".//input[@id='mui-1']")
        time.sleep(1)
        search_bar.send_keys("Asia")
        submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
        self.driver.execute_script("arguments[0].click()", submit)
        time.sleep(1)
        region_names = self.driver.find_elements(
            By.XPATH, ".//div[@aria-colindex=4]//span//mark"
        )

        for name in region_names:
            assert name.text == "Asia"

    def testSearchTopSong(self):
        try:
            open_filter = self.driver.find_element(
                By.XPATH, ".//button[@class='accordion-button collapsed']"
            )
            self.driver.execute_script("arguments[0].click()", open_filter)
        except NoSuchElementException:
            pass

        search_bar = self.driver.find_element(By.XPATH, ".//input[@id='mui-1']")
        time.sleep(1)
        search_bar.send_keys("Smells Like Teen Spirit")
        submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
        self.driver.execute_script("arguments[0].click()", submit)
        time.sleep(1)
        top_song_names = self.driver.find_elements(
            By.XPATH, ".//div[@aria-colindex=5]//span//mark"
        )

        for name in top_song_names:
            assert name.text == "Smells Like Teen Spirit"

    def testSearchTopArtist(self):
        try:
            open_filter = self.driver.find_element(
                By.XPATH, ".//button[@class='accordion-button collapsed']"
            )
            self.driver.execute_script("arguments[0].click()", open_filter)
        except NoSuchElementException:
            pass

        search_bar = self.driver.find_element(By.XPATH, ".//input[@id='mui-1']")
        time.sleep(1)
        search_bar.send_keys("Coldplay")
        submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
        self.driver.execute_script("arguments[0].click()", submit)
        time.sleep(1)
        top_song_names = self.driver.find_elements(
            By.XPATH, ".//div[@aria-colindex=6]//span//mark"
        )

        for name in top_song_names:
            assert name.text == "Coldplay"


if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=["first-arg-is-ignored"])
