import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service


import time

import sys

PATH = ""
URL = "https://www.lyriccheck.me/song"
# URL = "http://127.0.0.1:3000/song"


class TestSongs(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        s = Service(PATH)
        cls.driver = webdriver.Chrome(executable_path=PATH, options=chrome_options)
        cls.driver.get(URL)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def testForwardPagination(self):
        time.sleep(2)
        can_next = True

        number_of_pages = (
            self.driver.find_element(By.XPATH, ".//ul/li[last()-1]/button")
        ).text

        can_next = True
        counter = 0

        while can_next:
            counter += 1
            next_button = self.driver.find_element(
                By.XPATH, ".//button[@aria-label='Go to next page']"
            )
            self.driver.execute_script("arguments[0].click()", next_button)
            can_next = next_button.is_enabled()

        assert counter == (int(number_of_pages) - 1)

    def testBackwardsPagination(self):
        time.sleep(2)

        number_of_pages = (
            self.driver.find_element(By.XPATH, ".//ul/li[last()-1]/button")
        ).text

        can_back = True
        counter = 0

        last_page = self.driver.find_element(By.XPATH, ".//ul/li[last()-1]/button")
        self.driver.execute_script("arguments[0].click()", last_page)

        while can_back:
            counter += 1
            back_button = self.driver.find_element(
                By.XPATH, ".//button[@aria-label='Go to previous page']"
            )
            self.driver.execute_script("arguments[0].click()", back_button)
            can_back = back_button.is_enabled()

        assert counter == (int(number_of_pages) - 1)


if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=["first-arg-is-ignored"])
