import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

import sys
import time

PATH = ""

URL = "https://www.lyriccheck.me/artist"
# URL = "http://127.0.0.1:3000/artist"


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

    def testFilterGenre(self):
        try:
            open_filter = self.driver.find_element(
                By.XPATH, ".//button[@class='accordion-button collapsed']"
            )
            self.driver.execute_script("arguments[0].click()", open_filter)
        except NoSuchElementException:
            pass

        time.sleep(1)
        genre_dropdown = self.driver.find_element(By.XPATH, ".//div[@role='button']")
        genre_dropdown.click()
        # self.driver.execute_script("arguments[0].click()", genre_dropdown)
        time.sleep(1)
        pop = self.driver.find_element(By.XPATH, ".//li[@data-value='pop']")
        self.driver.execute_script("arguments[0].click()", pop)
        time.sleep(1)
        submit = self.driver.find_element(By.XPATH, ".//button[@type='submit']")
        self.driver.execute_script("arguments[0].click()", submit)
        time.sleep(1)
        genre_names = self.driver.find_elements(
            By.XPATH, ".//div[@aria-colindex=6]//span//span"
        )

        for name in genre_names:
            assert name.get_attribute("innerHTML") == "Pop"


if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=["first-arg-is-ignored"])
