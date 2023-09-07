import sqlalchemy_utils.types
import sqlalchemy_utils
#
# This file is part of Invenio.
# Copyright (C) 2016-2018 CERN.
#
# Invenio is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Create restoration branch for restoration."""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'restoration_1'
down_revision = None
branch_labels = ('restoration',)
depends_on = None


def upgrade():
    """Upgrade database."""
    pass


def downgrade():
    """Downgrade database."""
    pass
