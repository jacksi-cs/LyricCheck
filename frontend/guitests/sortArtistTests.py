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

    def testSortViews(self):
        views = self.driver.find_element(
            By.XPATH, ".//div[@data-field='views']//div//div//div//button"
        )
        time.sleep(1)
        self.driver.execute_script("arguments[0].click()", views)
        time.sleep(1)
        views = self.driver.find_elements(By.XPATH, ".//div[@data-field='views']")[1:]

        prev_val = 0
        for view in views:
            # print(view.get_attribute("innerHTML"))
            assert int(view.get_attribute("innerHTML")) >= prev_val
            prev_val = int(view.get_attribute("innerHTML"))

    def testSortFollowers(self):
        followers = self.driver.find_element(
            By.XPATH, ".//div[@data-field='followers']//div//div//div//button"
        )
        time.sleep(1)
        self.driver.execute_script("arguments[0].click()", followers)
        time.sleep(1)
        followers = self.driver.find_elements(
            By.XPATH, ".//div[@data-field='followers']"
        )[1:]

        prev_val = 0
        for follower in followers:
            # print(follower.get_attribute("innerHTML"))
            assert int(follower.get_attribute("innerHTML")) >= prev_val
            prev_val = int(follower.get_attribute("innerHTML"))


if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=["first-arg-is-ignored"])
