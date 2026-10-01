import uvicorn


def main():
    uvicorn.run(
        "gredforge.main:app",
        host="127.0.0.1",
        port=8000,
        reload=False,
    )


app = main


if __name__ == "__main__":
    main()