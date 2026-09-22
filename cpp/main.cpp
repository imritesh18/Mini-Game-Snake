#include <iostream>
#include <deque>
#include <utility>
#include <conio.h>
#include <windows.h>
#include <ctime>
#include <cstdlib>
#include <algorithm>

using namespace std;

class SnakeGame {
private:
    static const int WIDTH = 30;
    static const int HEIGHT = 18;

    deque<pair<int,int>> snake;
    pair<int,int> food;
    int dx, dy;
    int score;
    bool gameOver;

    void hideCursor() {
        HANDLE console = GetStdHandle(STD_OUTPUT_HANDLE);
        CONSOLE_CURSOR_INFO cursorInfo;
        GetConsoleCursorInfo(console, &cursorInfo);
        cursorInfo.bVisible = FALSE;
        SetConsoleCursorInfo(console, &cursorInfo);
    }

    void placeFood() {
        do {
            food = {rand() % WIDTH, rand() % HEIGHT};
        } while (find(snake.begin(), snake.end(), food) != snake.end());
    }

    bool isCollision(pair<int,int> head) {
        if (head.first < 0 || head.first >= WIDTH ||
            head.second < 0 || head.second >= HEIGHT)
            return true;

        return find(snake.begin(), snake.end(), head) != snake.end();
    }

    void draw() {
        system("cls");
        cout << "============================== SNAKE GAME ==============================\n";
        cout << "Score: " << score << "    Controls: Arrow Keys / WASD    X: Quit\n\n";

        for (int y = -1; y <= HEIGHT; ++y) {
            for (int x = -1; x <= WIDTH; ++x) {
                if (x == -1 || x == WIDTH || y == -1 || y == HEIGHT) {
                    cout << '#';
                    continue;
                }

                pair<int,int> pos = {x, y};

                if (pos == snake.front())
                    cout << 'O';
                else if (find(snake.begin() + 1, snake.end(), pos) != snake.end())
                    cout << 'o';
                else if (pos == food)
                    cout << '*';
                else
                    cout << ' ';
            }
            cout << '\n';
        }
    }

public:
    SnakeGame() {
        srand(static_cast<unsigned>(time(nullptr)));
        reset();
        hideCursor();
    }

    void reset() {
        snake.clear();
        snake.push_back({WIDTH / 2, HEIGHT / 2});
        snake.push_back({WIDTH / 2 - 1, HEIGHT / 2});
        snake.push_back({WIDTH / 2 - 2, HEIGHT / 2});
        dx = 1;
        dy = 0;
        score = 0;
        gameOver = false;
        placeFood();
    }

    void input() {
        if (!_kbhit()) return;

        int key = _getch();

        if (key == 'x' || key == 'X') {
            gameOver = true;
            return;
        }

        if (key == 0 || key == 224) {
            key = _getch();
            if (key == 72 && dy != 1)  { dx = 0; dy = -1; }
            if (key == 80 && dy != -1) { dx = 0; dy = 1; }
            if (key == 75 && dx != 1)  { dx = -1; dy = 0; }
            if (key == 77 && dx != -1) { dx = 1; dy = 0; }
            return;
        }

        if ((key == 'w' || key == 'W') && dy != 1)  { dx = 0; dy = -1; }
        if ((key == 's' || key == 'S') && dy != -1) { dx = 0; dy = 1; }
        if ((key == 'a' || key == 'A') && dx != 1)  { dx = -1; dy = 0; }
        if ((key == 'd' || key == 'D') && dx != -1) { dx = 1; dy = 0; }
    }

    void update() {
        pair<int,int> head = snake.front();
        head.first += dx;
        head.second += dy;

        if (isCollision(head)) {
            gameOver = true;
            return;
        }

        snake.push_front(head);

        if (head == food) {
            score += 10;
            placeFood();
        } else {
            snake.pop_back();
        }
    }

    void run() {
        cout << "Starting Snake Game...\n";
        Sleep(1000);

        while (!gameOver) {
            draw();
            input();
            update();

            int delay = max(55, 140 - score * 2);
            Sleep(delay);
        }

        draw();
        cout << "\nGAME OVER! Final Score: " << score << "\n";
        cout << "Press R to play again or any other key to exit.\n";

        int key = _getch();
        if (key == 'r' || key == 'R') {
            reset();
            run();
        }
    }
};

int main() {
    SnakeGame game;
    game.run();
    return 0;
}
