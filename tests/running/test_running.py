# SPDX-License-Identifier: Apache-2.0.
# Copyright (c) 2024 - 2025 Waldiez and contributors.
"""Test waldiez.running.running.*."""

import os
from pathlib import Path

import pytest

from waldiez.running import (
    a_chdir,
    a_install_requirements,
    after_run,
    before_run,
    chdir,
    install_requirements,
)


def test_chdir(tmp_path: Path) -> None:
    """Test chdir.

    Parameters
    ----------
    tmp_path : Path
        The temporary path.
    """
    # Given
    old_cwd = os.getcwd()
    # When
    with chdir(tmp_path):
        # Then
        assert os.getcwd() == str(tmp_path)
    # And
    assert os.getcwd() == old_cwd


@pytest.mark.asyncio
async def test_a_chdir(tmp_path: Path) -> None:
    """Test a_chdir.

    Parameters
    ----------
    tmp_path : Path
        The temporary path.
    """
    # Given
    old_cwd = os.getcwd()
    # When
    async with a_chdir(tmp_path):
        # Then
        assert os.getcwd() == str(tmp_path)
    # And
    assert os.getcwd() == old_cwd


def test_before_run(tmp_path: Path) -> None:
    """Test before_run.

    Parameters
    ----------
    tmp_path : Path
        The temporary path.
    """
    # When
    file_path = tmp_path / "test_before_run.py"
    file_name = before_run(file_path, None)
    # Then
    assert file_name == "test_before_run.py"

    # When
    file_path = tmp_path / "test_before_run.json"
    file_name = before_run(file_path, None)
    # Then
    assert file_name == "test_before_run.py"

    # When
    file_path = tmp_path / "test_before_run.waldiez"
    file_name = before_run(file_path, None)
    # Then
    assert file_name == "test_before_run.py"

    # When
    file_name = before_run("test_before_run", None)
    # Then
    assert file_name == "test_before_run.py"

    # When
    file_name = before_run(None, tmp_path / "uploads")
    # Then
    assert file_name == "waldiez_flow.py"


def test_install_requirements() -> None:
    """Test install_requirements."""
    extra_requirements = {"pytest"}
    install_requirements(extra_requirements)
    assert True


@pytest.mark.asyncio
async def test_a_install_requirements() -> None:
    """Test a_install_requirements."""
    extra_requirements = {"pytest"}
    await a_install_requirements(extra_requirements)


def test_after_run(tmp_path: Path) -> None:
    """Test after_run.

    Parameters
    ----------
    tmp_path : Path
        The temporary path.
    """
    flow_name = "flow_name"
    tmp_dir = tmp_path / "test_after_run"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    output_path = str(tmp_path / "output_path" / "output.py")

    after_run(
        temp_dir=tmp_dir,
        output_path=output_path,
        flow_name=flow_name,
        skip_mmd=False,
    )

    logs_dir = tmp_dir / "logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    event_csv = logs_dir / "events.csv"
    with open(event_csv, "w", encoding="utf-8", newline="\n") as file:
        # pylint: disable=line-too-long
        file.write(
            "event_name,source_id,source_name,agent_module,agent_class_name,id,json_state,timestamp\n"  # noqa: E501
            "start,source_id,source_name,agent_module,agent_class_name,id,{},000000000\n"  # noqa: E501
        )

    after_run(
        temp_dir=tmp_dir,
        output_path=output_path,
        flow_name=flow_name,
        skip_mmd=False,
    )

    tmp_dir.mkdir(parents=True, exist_ok=True)
    after_run(
        temp_dir=tmp_dir,
        output_path=None,
        flow_name=flow_name,
        skip_mmd=True,
    )
